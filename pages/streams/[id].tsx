import type { NextPage } from 'next';
import Layout from 'components/layout';
import Message from 'components/message';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import useMutation from 'libs/client/useMutation';
import { Stream } from '@prisma/client';
import useUser from 'libs/client/useUser';
import { useEffect } from 'react';

interface StreamMessage {
  message: string;
  id: number;
  user: {
    avatar: string;
    id: number;
    name: string;
  };
}

interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessages;
}

interface MessageForm {
  message: string;
}

const Stream: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [sendMessage, { loading, data: sendMessageData }] =
    useMutation<StreamResponse>(`/api/streams/${router.query.id}/message`);
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      // refreshInterval: 1000,
    }
  );
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const onValid = (form: MessageForm) => {
    if (form.message.length === 0 || loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message: form.message,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false
    );
    sendMessage(form);
  };

  return (
    <Layout canGoBack seoTitle={data?.stream?.name || 'Streaming Product'}>
      <div className='py-10 px-4  space-y-4'>
        {data?.stream?.cloudflareId ? (
          <iframe
            className='w-full aspect-video rounded-md bg-slate-300 shadow-sm'
            src={`https://iframe.videodelivery.net/${data?.stream?.cloudflareId}`}
            allow='accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;'
            allowFullScreen={true}
          ></iframe>
        ) : (
          <div className='w-full aspect-video rounded-md bg-slate-300 shadow-sm' />
        )}
        <div className='mt-5'>
          <h1 className='text-3xl font-bold text-gray-900'>
            {data?.stream?.name}
          </h1>
          <span className='text-2xl block mt-3 text-gray-900'>
            {data?.stream?.price}
          </span>
          {data?.stream?.userId === user?.id && (
            <ul className='bg-orange-400 p-5 rounded-md overflow-x-scroll flex flex-col space-y-3'>
              <li>{data?.stream?.cloudflareId}</li>
              <li>{data?.stream?.cloudflareUrl}</li>
              <li>{data?.stream?.cloudflareKey}</li>
            </ul>
          )}
          <p className=' my-6 text-gray-700'>{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Live Chat</h2>
          <div className='py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4'>
            {data?.stream?.messages.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={message.user.id === user?.id}
              />
            ))}
          </div>
          <form
            onSubmit={handleSubmit(onValid)}
            className='fixed py-2 bg-white  bottom-0 inset-x-0'
          >
            <div className='flex relative max-w-md items-center  w-full mx-auto'>
              <input
                {...register('message', { required: true })}
                name='message'
                type='text'
                className='shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500'
              />
              <div className='absolute inset-y-0 flex py-1.5 pr-1.5 right-0'>
                <button className='flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white'>
                  &rarr;
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;

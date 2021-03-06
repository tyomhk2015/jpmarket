import type { NextPage } from 'next';
import Button from 'components/button';
import Input from 'components/input';
import Layout from 'components/layout';
import useUser from 'libs/client/useUser';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useMutation from 'libs/client/useMutation';
import { cls } from 'libs/client/utils';

interface EditProfileForm {
  email?: string;
  phone?: number;
  name?: string;
  avatar?: FileList;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const { register, setValue, handleSubmit, setError, watch } =
    useForm<EditProfileForm>({ reValidateMode: 'onSubmit' });
  const [editProfile, { data, loading }] = useMutation<EditProfileResponse>(
    `/api/users/currentUser`
  );
  const [isError, setIsError] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const avatar = watch('avatar');

  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (!email && !phone && !name) {
      setIsError(true);
      setResultMessage('Name, email, or phone number, or name is required.');
    } else {
      if (avatar && avatar.length > 0 && user) {
        const { uploadURL } = await (await fetch(`/api/files`)).json();
        const formData = new FormData();
        formData.append('file', avatar[0], user?.id.toString());

        const {
          result: { id },
        } = await (
          await fetch(uploadURL, {
            method: 'POST',
            body: formData,
          })
        ).json();

        console.log(id);

        // upload file to CF URL
        editProfile({
          email,
          phone,
          name,
          avatarId: id,
        });
      } else {
        setIsError(false);
        editProfile({
          email,
          phone,
          name,
        });
        setResultMessage('');
      }
    }
  };

  useEffect(() => {
    if (user?.name) setValue('name', user.name);
    if (user?.email) setValue('email', user.email);
    if (user?.phone) setValue('phone', +user.phone);
    if (user?.avatar) {
      setAvatarPreview(
        `https://imagedelivery.net/_wo6jvg8GW1hy3HwUY-d5w/${user.avatar}/avatar`
      );
    }
  }, [user, setValue]);

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setIsError(true);
      setResultMessage(data.error);
      setUpdateSuccess(false);
    } else if (data && data.ok && !data.error) {
      setIsError(false);
      setUpdateSuccess(true);
      setResultMessage('Your profile is updated!');
    }
  }, [data, setError]);

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <Layout canGoBack title='Edit Profile' seoTitle='Editing Profile'>
      <form onSubmit={handleSubmit(onValid)} className='py-10 px-4 space-y-4'>
        <div className='flex items-center space-x-3'>
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className='w-14 h-14 rounded-full bg-slate-500'
            />
          ) : (
            <div className='w-14 h-14 rounded-full bg-slate-500' />
          )}
          <label
            htmlFor='picture'
            className='cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700'
          >
            Change
            <input
              {...register('avatar')}
              id='picture'
              type='file'
              className='hidden'
              accept='image/*'
            />
          </label>
        </div>
        <Input
          register={register('name')}
          required={false}
          label='Name'
          name='name'
          type='text'
        />
        <Input
          register={register('email')}
          required={false}
          label='Email address'
          name='email'
          type='email'
        />
        <Input
          register={register('phone')}
          required={false}
          label='Phone number'
          name='phone'
          type='number'
          kind='phone'
        />
        <div className='h-6 text-center'>
          <span
            className={cls(
              `my-2 font-medium ${isError && 'text-red-500'} ${
                updateSuccess && 'text-green-500'
              }`
            )}
          >
            {isError && resultMessage}
            {updateSuccess && resultMessage}
          </span>
        </div>
        <Button
          loading={loading}
          text={loading ? 'Loading...' : 'Update profile'}
        />
      </form>
    </Layout>
  );
};

export default EditProfile;

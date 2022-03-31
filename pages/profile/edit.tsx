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
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
  } = useForm<EditProfileForm>({ reValidateMode: 'onSubmit' });
  const [editProfile, { data, loading }] = useMutation<EditProfileResponse>(
    `/api/users/currentUser`
  );

  const onValid = ({ email, phone, name }: EditProfileForm) => {
    if (loading) return;
    if (!email && !phone && !name) {
      setIsError(true);
      setResultMessage('Name, email, or phone number, or name is required.');
    } else {
      setIsError(false);
      editProfile({
        email,
        phone,
        name,
      });
      setResultMessage('');
    }
  };


  useEffect(() => {
    if (user?.name) setValue('name', user.name);
    if (user?.email) setValue('email', user.email);
    if (user?.phone) setValue('phone', +user.phone);
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

  return (
    <Layout canGoBack title='Edit Profile'>
      <form onSubmit={handleSubmit(onValid)} className='py-10 px-4 space-y-4'>
        <div className='flex items-center space-x-3'>
          <div className='w-14 h-14 rounded-full bg-slate-500' />
          <label
            htmlFor='picture'
            className='cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700'
          >
            Change
            <input
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
          <span className={cls(`my-2 font-medium ${isError && 'text-red-500'} ${updateSuccess && 'text-green-500'}`)}>
            {isError && resultMessage}
            {updateSuccess && resultMessage}
          </span>
        </div>
        <Button text='Update profile' />
      </form>
    </Layout>
  );
};

export default EditProfile;

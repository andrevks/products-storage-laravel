
import {Button, TextInput} from '@mantine/core';

import {IconAt, IconEyeCheck, IconEyeOff, IconLock, IconMail} from '@tabler/icons';
import {PasswordInput} from '@mantine/core';
import styles from './SignInForm.module.css'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export interface ISigninData {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().required('Email é obrigatório').email('Email inválido'),
    password: yup
      .string()
      .required('Senha é obrigatória')
      .min(6, 'Mínino 6 digitos')
      .max(8, 'Máximo 8 digitos'),
  })
  .required()

export function SignInForm(){
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninData>({
    resolver: yupResolver(schema),
  })

  const { signIn } = useContext(AuthContext)


  async function onSubmit(data: ISigninData){
    try {
      await signIn(data)
      alert("Posseguindo...")
    } catch (error: any) {
      // console.log(error);
      alert(error?.message)
    }
   
  }

  return (
    <form 
      className={styles.login}
      onSubmit={handleSubmit(onSubmit)}
    >

    
      <TextInput
        {...register('email')}
        icon={<IconMail size={20} />}
        placeholder='joao@email.com'
        label='Email'
        error={errors.email?.message}
        radius='md'
        size='lg'
        withAsterisk
      />  

      <PasswordInput 
        placeholder="Sua Senha" 
        size="lg" 
        label='Senha'
        icon={<IconLock size={20} />}
        error={errors?.password?.message}
        radius="md"
        visibilityToggleIcon={({ reveal, size }) =>
          reveal ? (
            <IconEyeOff size={size}  />
          ) : (
            <IconEyeCheck size={size} />
          )
        } 
        withAsterisk
        {...register('password')}
      />

      <Button 
        type="submit"
        radius="md"
        uppercase
        >
        
        Fazer Login
      </Button>


    </form>
  )
}
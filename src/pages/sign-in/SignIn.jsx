import { Button, Grid, Stack, TextInput } from '@mantine/core'
import { useSignInForm, useSignInSubmit } from '~/hooks/use-query/'

export function SignIn() {
  const { onSubmit, getInputProps, model, clearFieldError } = useSignInForm()
  const { mutate } = useSignInSubmit()

  return (
    <Grid>
      <form onSubmit={onSubmit(mutate)}>
        <Stack>
          <TextInput
            type={'text'}
            required={true}
            label={'User name'}
            placeholder={'Enter your user name'}
            {...getInputProps(model.username)}
          />
          <TextInput
            type={'password'}
            required={true}
            label={'Password'}
            placeholder={'Enter your password'}
            {...getInputProps(model.password)}
          />
          <Button type={'submit'}>Sign In</Button>
          <Button type={'reset'}>Reset</Button>
        </Stack>
      </form>
    </Grid>
  )
}

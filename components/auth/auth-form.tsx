import { authState } from "@/app/auth/actions"

type AuthProps = {
  state: authState
}

function AuthForm({ state }: AuthProps) {
  return (
    <>
      <div>
        <label htmlFor="email">Email :</label>
        <input
          className="p-2 border rounded-md mt-2"
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          required
          aria-describedby="email-error"
        />
        {state.error?.email && (
          <small id="email-error">{state.error.email}</small>
        )}
      </div>
      <div>
        <label htmlFor="password1">Password :</label>
        <input
          className="p-2 border rounded-md mt-2"
          type="password"
          id="password1"
          placeholder="Password"
          name="password1"
          required
          aria-describedby="password1-error"
        />
        {state.error?.password1 && (
          <small id="password1-error">{state.error.password1}</small>
        )}
      </div>
    </>
  )
}

export default AuthForm

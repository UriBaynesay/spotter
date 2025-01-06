function AuthForm() {
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
        />
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
        />
      </div>
    </>
  )
}

export default AuthForm

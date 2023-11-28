"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "../../../../lib/initSupabase";

type Inputs = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    console.log(inputs);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: inputs.email,
      password: inputs.password,
    });

    console.log(data);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input placeholder="test" {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}

        {/* include validation with required or other standard HTML validation rules */}
        <input type="password" {...register("password", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </>
  );
}

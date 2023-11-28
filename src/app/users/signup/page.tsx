"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "../../../../lib/initSupabase";

type Inputs = {
  email: string;
  password: string;
  passwordRequired: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    console.log(inputs);
    // const email = getFieldState("email");
    // const password = getFieldState("password")

    const { data, error } = await supabase.auth.signUp({
      email: inputs.email,
      password: inputs.password,
      options: {
        emailRedirectTo: "http://localhost:3000/welcome",
      },
    });

    // if (data) {
    //   fetch("http://localhost:3000/welcome", (req, res) => {

    //   })
    // } else if (error) {

    // }

    console.log(data);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input placeholder="test" {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}

      {/* include validation with required or other standard HTML validation rules */}
      <input type="password" {...register("password", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}

      <input
        type="password"
        {...register("passwordRequired", { required: true })}
      />
      {/* errors will return when field validation fails  */}
      {errors.passwordRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}

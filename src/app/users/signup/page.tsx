import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  password: string;
  passwordRequired: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("passwordRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.passwordRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}

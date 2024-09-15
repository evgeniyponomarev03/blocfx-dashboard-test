"use client";

import Image from "next/image";
import Container from "../ui/Container";
import Input from "../ui/Input";
import Icons from "@/assets/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputPassword from "../ui/InputPassword";
import Button from "../ui/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const loginInSchema = yup.object().shape({
  email: yup.string().email("Invalid email.").required("Email is required."),
  password: yup.string().min(4, "Minimum 4 chars."),
});

type LogInValues = {
  email: string;
  password?: string;
};

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInValues>({
    mode: "all",
    shouldUnregister: false,
    resolver: yupResolver(loginInSchema),
  });

  const onSubmit = async (values: LogInValues) => {
    const res = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    console.log(res);
    if (res?.error) {
      alert("Login failed");
    } else {
      router.push("/");
    }
  };

  return (
    <section className="py-8">
      <Container>
        <Image
          width={51}
          height={71}
          className="mb-8 w-[51px] h-[71px]"
          src={Icons.LogoBlack}
          alt="blocfx"
          priority
          unoptimized
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <legend className="font-bold text-[40px] mb-8">Log in</legend>

          <div className="mb-[35px]">
            <Input {...register("email")} label="Email Address" />
            <p className="opacity-50 min-h-4 md:min-h-6">
              {errors?.email?.message}
            </p>
          </div>
          <div className="mb-[50px]">
            <InputPassword {...register("password")} />
            <p className="opacity-50 min-h-4 md:min-h-6">
              {errors?.password?.message}
            </p>
          </div>
          <Button disabled={isSubmitting} className="block mx-auto">
            Log In
          </Button>
        </form>
        <p className="text-center mt-24 text-[#878787]">
          Don&apos;t have an account?{" "}
          <span>
            <a
              href="https://app.shuftipro.com/verification/journey/Wk9PYZYj1709140682#"
              className="text-[#26273A] underline hover:no-underline"
              target={"_blank"}
              rel={"noreferrer"}
            >
              Sign Up
            </a>
          </span>
        </p>
      </Container>
    </section>
  );
};

export default Login;

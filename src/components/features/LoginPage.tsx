"use client";

import Image from "next/image";
import Container from "../ui/Container";
import Input from "../ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import Logo from "@/assets/images/logo.png";
import PhoneNumberInput from "../ui/PhoneInput";
import api from "@/axios/api";

const loginInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email.")
    .required("Email is required.")
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      "Email must be in lowercase.",
    ),
  phone: yup
    .string()
    .required("Phone is required.")
    .matches(
      /^\+\d{1,14}$/,
      "Phone number must start with + and contain up to 14 digits."
    ),
  // password: yup.string().min(4, "Minimum 4 chars."),
});

type LogInValues = {
  email: string;
  phone: string;
  // password?: string;
};

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LogInValues>({
    mode: "all",
    shouldUnregister: false,
    resolver: yupResolver(loginInSchema),
  });

  const onSubmit = async (values: LogInValues) => {
    try {
      const res = await api.post("/auth/login", {
        ...values,
      });
      router.push(res.data?.verification_url);
    } catch {
      alert("Failed to log in.");
    }
    // const res = await signIn("credentials", {
    //   ...values,
    //   redirect: false,
    // });

    // if (res?.error) {
    //   alert("Login failed");
    // } else {
    //   router.push("/");
    // }
  };

  return (
    <section className="py-8">
      <Container>
        <Image
          width={51}
          height={71}
          className="mb-8 w-[51px] h-[71px]"
          src={Logo}
          alt="blocfx"
          priority
          unoptimized
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <legend className="font-bold text-[40px] mb-8">Log in</legend>

          <div className="mb-[35px]">
            <Input {...register("email")} label="Email Address" />
            <p className="text-sm text-[red] opacity-50 min-h-4 md:min-h-6">
              {errors?.email?.message}
            </p>
          </div>
          <div className="mb-[35px]">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) => {
                    let newValue = e.target.value;

                    if (!newValue.startsWith("+")) {
                      newValue = `+${newValue.replace(/[^0-9]/g, "")}`;
                    }

                    newValue = newValue.replace(/[^0-9+]/g, "");
                    field.onChange(newValue);
                  }}
                  label="Phone"
                />
              )}
            />

            <p className="text-sm text-[red] opacity-50 min-h-4 md:min-h-6">
              {errors?.phone?.message}
            </p>
          </div>

          {/* <div className="mb-[50px]">
            <InputPassword {...register("password")} />
            <p className="opacity-50 min-h-4 md:min-h-6">
              {errors?.password?.message}
            </p>
          </div> */}
          <Button loading={isSubmitting} className="block mx-auto">
            Next
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

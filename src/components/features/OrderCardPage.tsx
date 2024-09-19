"use client";

import Container from "../ui/Container";
import Input from "../ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import * as yup from "yup";
import Button from "../ui/Button";
import { Select, Option } from "../ui/Select";
import CountryAutocomplete from "../ui/CountryAutocomplete";
import { useEffect, useState } from "react";
import api from "@/axios/api";
import CURRENCIES from "@/constants/currencies";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { formatBalance } from "@/utils/formatBalance";
import Icons from "@/assets/icons";

const orderCardSchema = yup.object().shape({
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(100, "Address must be at most 100 characters")
    .matches(/^[a-zA-Z0-9\s,.'-]{3,}$/, "Address contains invalid characters"),
  holderName: yup
    .string()
    .required("Enter your Full Name")
    .matches(/^[a-zA-Z ]+$/, "Only letters are allowed")
    .test("is-full-name", "Please enter your full name", (value) => {
      return value?.trim().split(" ").length >= 2;
    }),
});

type OrderCardValues = {
  address: string;
  holderName: string;
};

const OrderCardPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderCardValues>({
    mode: "all",
    shouldUnregister: false,
    resolver: yupResolver(orderCardSchema),
  });

  const onSubmit = async (values: OrderCardValues) => {
    try {
      await api.post("/users/cards/order", {
        ...values,
      });
      router.push("/success");
    } catch (err) {
      console.error(err);
      alert((err as any).response.data.message);
    }
  };

  return (
    <section className="py-8">
      <Container>
        <div className="flex gap-2 items-center mb-[64px]">
          <button
            onClick={() => router.back()}
            className="bg-yankees-blue py-3 px-5 rounded-3xl"
          >
            <Image src={Icons.ArrowBack} alt="back" />
          </button>
          <h1 className="font-bold text-xl">Order Card</h1>
        </div>

        <p className="text-taupe-gray mb-[64px]">
          To order your card, please fill out the fields below carefully.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-[15px]">
            <Input {...register("address")} label="Address" />
            <p className="text-sm text-[red] opacity-50 min-h-4 md:min-h-6">
              {errors?.address?.message}
            </p>
          </div>
          <div className="mb-[15px]">
            <Input {...register("holderName")} label="Full name" />
            <p className="text-sm text-[red] opacity-50 min-h-4 md:min-h-6">
              {errors?.holderName?.message}
            </p>
          </div>
          <Button disabled={isSubmitting} className="block mx-auto mt-[174px]">
            Confirm
          </Button>
        </form>
      </Container>
    </section>
  );
};

export default OrderCardPage;

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

const transferSchema = yup.object().shape({
  iban: yup
    .string()
    .matches(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/, "Invalid IBAN")
    .required("IBAN is required."),
  swift: yup
    .string()
    .matches(
      /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
      "Invalid BIC/SWIFT code"
    )
    .required("BIC/SWIFT code is required"),
  requesteeName: yup.string().required("Name is required"),
  amount: yup.string().required("Amount is required."),
  country: yup.string().required("Country is required"),
});

type TransferValues = {
  iban: string;
  swift: string;
  requesteeName: string;
  amount: string;
  country: string;
};

const TransferPage = () => {
  const router = useRouter();
  const session = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<TransferValues>({
    mode: "all",
    shouldUnregister: false,
    resolver: yupResolver(transferSchema),
  });
  const [currency, setCurrency] = useState<keyof typeof CURRENCIES>("USD");
  const [balanceData, setBalanceData] = useState<null | any>(null);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

  const balance = balanceData?.data?.balance;

  useEffect(() => {
    setIsBalanceLoading(true);
    api
      .get(`/users/cards/balance?currency=${currency}`)
      .then((res) => setBalanceData(res.data))
      .finally(() => setIsBalanceLoading(false));
  }, [currency]);

  const onSubmit = async (values: TransferValues) => {
    try {
      await api.post("/transfers", {
        ...values,
        amount: +values.amount,
        currency,
        senderAccountNumber: session.data?.user?.accountNumber,
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
        <div className="flex gap-2 items-center mb-7">
          <button
            onClick={() => router.back()}
            className="bg-yankees-blue py-3 px-5 rounded-3xl"
          >
            <Image src={Icons.ArrowBack} alt="back" />
          </button>
          <h1 className="font-bold text-xl">Transfer Request</h1>
        </div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg text-taupe-gray font-medium">
            Available Balance
          </p>
          <Select
            placeholder="Select Currency"
            className="max-w-[143px]"
            onChange={(_: never, val: keyof typeof CURRENCIES) =>
              setCurrency(val)
            }
            value={currency}
          >
            <Option value="EUR">EURO €</Option>
            <Option value="AED">AED د.إ</Option>
            <Option value="USD">DOLLAR $</Option>
            <Option value="GBP">GBP £</Option>
          </Select>
        </div>
        {balance !== null && (
          <strong className="font-bold text-4xl block mb-8">
            {isBalanceLoading && "Loading..."}
            {!isBalanceLoading &&
              `${CURRENCIES[currency]}${formatBalance(balance)}`}
          </strong>
        )}
        <p className="text-taupe-gray mb-6">
          Please, enter the receiver’s bank account number or phone number with
          the amount of transfer request in below field.
        </p>
        {balance === 0 && (
          <p className="font-bold text-sm text-[red]">
            You have no available balance to send.
          </p>
        )}
        {!!balance && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[15px]">
              <Input
                {...register("iban")}
                label="IBAN"
                placeholder="IBAN (e.g., DE89370400440532013000)"
              />
              <p className="text-sm text-[red] opacity-50 min-h-4 md:min-h-6">
                {errors?.iban?.message}
              </p>
            </div>
            <div className="mb-[15px]">
              <Input
                {...register("swift")}
                placeholder="SWIFT code (e.g., ABCDGB2L)"
                label="BIC/SWIFT"
              />
              <p className="text-sm text-[red] opacity-50 min-h-4 md:min-h-6">
                {errors?.swift?.message}
              </p>
            </div>
            <div className="mb-[15px]">
              <Input
                {...register("amount")}
                label="Amount of Transfer Request"
                type="number"
              />
              <p className="text-sm text-[red] opacity-50 min-h-4 md:min-h-6">
                {errors?.amount?.message}
              </p>
            </div>
            <div className="mb-[15px]">
              <Input {...register("requesteeName")} label="Requestee’s Name" />
              <p className="text-sm text-[red] opacity-50 min-h-4 md:min-h-6">
                {errors?.requesteeName?.message}
              </p>
            </div>
            <div className="mb-6">
              <label className="inline-block mb-1 text-sm md:text-base text-taupe-gray">
                Country
              </label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <CountryAutocomplete
                    {...field}
                    onChange={(_: Event, option: any) => {
                      if (!option) return;
                      field.onChange(option.code);
                    }}
                  />
                )}
              />
              <p className="text-sm text-[red] opacity-50 min-h-4 md:min-h-6">
                {errors?.country?.message}
              </p>
            </div>
            <Button loading={isSubmitting} className="block mx-auto">
              Send
            </Button>
          </form>
        )}
      </Container>
    </section>
  );
};

export default TransferPage;

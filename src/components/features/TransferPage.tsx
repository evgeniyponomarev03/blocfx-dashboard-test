"use client";

import Container from "../ui/Container";
import Input from "../ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../ui/Button";
import { Select, Option } from "../ui/Select";
import CountryAutocomplete from "../ui/CountryAutocomplete";
import { useEffect, useState } from "react";
import api from "@/axios/api";
import CURRENCIES from "@/constants/currencies";
import Navigation from "../widgets/Navigation";

const transferSchema = yup.object().shape({
  senderAccountNumber: yup
    .string()
    .min(4, "Minimum 4 chars.")
    .required("Address is required."),
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
  senderAccountNumber: string;
  swift: string;
  requesteeName: string;
  amount: string;
  country: string;
};

function formatBalance(num: number) {
  let [integerPart, decimalPart] = num.toFixed(2).split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${formattedInteger}.${decimalPart}`;
}

const TransferPage = () => {
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
  const [balance, setBalance] = useState<null | number>(null);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

  useEffect(() => {
    setIsBalanceLoading(true);
    api
      .get(`/users/cards/balance?currency=${currency}`)
      .then((res) => setBalance(res.data.data?.balance))
      .finally(() => setIsBalanceLoading(false));
  }, [currency]);

  const onSubmit = async (values: TransferValues) => {
    try {
      await api.post("/transfers", {
        ...values,
        amount: +values.amount,
        currency,
      });
    } catch (err) {
      console.log(err);
      alert((err as any).response.data.message);
    }
  };

  return (
    <section className="py-8">
      <Container>
        <h1 className="font-bold text-xl mb-7">Transfer Request</h1>
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
          <p className="font-bold text-[red]">
            You have no available balance to send.
          </p>
        )}
        {!!balance && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[35px]">
              <Input
                {...register("senderAccountNumber")}
                label="Sender’s Account No."
              />
              <p className="opacity-50 min-h-4 md:min-h-6">
                {errors?.senderAccountNumber?.message}
              </p>
            </div>
            <div className="mb-[15px]">
              <Input {...register("swift")} label="BIC/SWIFT" />
              <p className="opacity-50 min-h-4 md:min-h-6">
                {errors?.swift?.message}
              </p>
            </div>
            <div className="mb-[15px]">
              <Input
                {...register("amount")}
                label="Amount of Transfer Request"
                type="number"
              />
              <p className="opacity-50 min-h-4 md:min-h-6">
                {errors?.amount?.message}
              </p>
            </div>
            <div className="mb-[15px]">
              <Input {...register("requesteeName")} label="Requestee’s Name" />
              <p className="opacity-50 min-h-4 md:min-h-6">
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
              <p className="opacity-50 min-h-4 md:min-h-6">
                {errors?.country?.message}
              </p>
            </div>
            <Button disabled={isSubmitting} className="block mx-auto">
              Send
            </Button>
          </form>
        )}
        <Navigation />
      </Container>
    </section>
  );
};

export default TransferPage;

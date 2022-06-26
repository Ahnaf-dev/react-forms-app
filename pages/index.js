import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [valid, isValid] = useState(false);
  const onSubmit = (data) => {
    isValid(true);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="home-page-form"
      className="form"
    >
      {valid && <span className="valid">Form Submitted</span>}
      <div className={`form__group ${errors.name ? "error" : ""}`}>
        <input
          type="text"
          id="name"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        <span className="form__error">
          {errors.name?.type === "required" && "Name is required"}
        </span>
      </div>
      <div className={`form__group ${errors.email ? "error" : ""}`}>
        <input
          type="email"
          id="email"
          placeholder="Your Email"
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
        />
        <span className="form__error">
          {errors.email?.type === "required" && "Email is required"}
          {errors.email?.type === "pattern" && "Please Enter A Valid Email"}
        </span>
      </div>
      <div className="form__group">
        <input
          type="text"
          id="message"
          placeholder="Message (optional)"
          {...register("message")}
        />
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

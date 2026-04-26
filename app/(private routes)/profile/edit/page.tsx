"use client";

import { useRouter } from "next/navigation";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { updateMe } from "@/lib/api/clientApi";

const EditProfilePage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as { username: string };

      const newusername = formValues.username;
      if (newusername && newusername.trim()) {
        const res = await updateMe({
          username: newusername,
        });
        if (res) {
          setUser(res);
          router.push("/profile");
        } else {
          setError("Invalid email or password");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.error || error.message || "Oops... some error",
        );
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => {
                router.back();
              }}
            >
              Cancel
            </button>
          </div>
          <p className={css.error}>{error}</p>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;

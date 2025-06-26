import { z } from "zod/v3";

const nameSchema = z
    .string()
    .min(1, { message: "Name is required" })
    .max(27, { message: "Name can be up to 27 characters" })
    .regex(/^[\p{L}\p{N}_]+$/u, {
        message: "Name can only contain letters, numbers and underscores",
    });

const emailSchema = z.string().email({ message: "Invalid email address" });

const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password can be up to 128 characters" })
    .regex(/^[\p{L}\p{N}!@#$%^&*()_\-+=\[\]{}:;.,?]+$/u, {
        message: "Your password contains forbidden characters or emoji",
    });

const confirmPasswordSchema = z
    .string()
    .min(1, { message: "Please confirm your password" });

const RegisterSchema = z
    .object({
        name: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema,
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                path: ["confirmPassword"],
                code: "custom",
                message: "Passwords do not match",
            });
        }
    });

const LoginSchema = z.object({
    email: emailSchema,
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .regex(/^[\p{L}\p{N}!@#$%^&*()_\-+=\[\]{}:;.,?]+$/u, {
            message: "Your password contains forbidden characters or emoji",
        }),
});

const ForgotPasswordSchema = z.object({
    email: emailSchema,
});

const ChangePasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema,
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                path: ["confirmPassword"],
                code: "custom",
                message: "Passwords do not match",
            });
        }
    });

export {
    RegisterSchema,
    LoginSchema,
    ForgotPasswordSchema,
    ChangePasswordSchema,
};

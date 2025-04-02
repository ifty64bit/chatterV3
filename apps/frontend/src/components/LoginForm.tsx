import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useLogin } from "@/api/auth.api";

const loginSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
    const loginMutation = useLogin({
        onSuccess: (data) => {
            console.log("DATA: :", data.token);
        },
        onError: (e) => {
            console.error("Error: ", e?.status, e?.value);
        },
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        loginMutation.mutate(values);
    }

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Mofiz77" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Login</Button>
            </form>
        </Form>
    );
}

export default LoginForm;

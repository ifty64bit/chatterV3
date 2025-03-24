import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

function Home() {
    return (
        <section>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            <div className="flex gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Login</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Welcome back!</DialogTitle>
                        <DialogDescription>
                            Please enter your username and password.
                        </DialogDescription>
                        <LoginForm />
                    </DialogContent>
                </Dialog>

                <Button>Register</Button>
            </div>
        </section>
    );
}

export default Home;

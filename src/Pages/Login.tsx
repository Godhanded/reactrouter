import React from "react";
import "../Styles/Login.css";
import {
	ActionFunctionArgs,
	Form,
	LoaderFunctionArgs,
	redirect,
	useActionData,
	useLoaderData,
	useNavigation,
} from "react-router-dom";
import { loginUser } from "../Api";
import { UserLoginRequest } from "../types";
import { requiresAuth } from "../utils";

export const loader = ({ request }: LoaderFunctionArgs) => {
	if (!requiresAuth(request)) {
		const response = redirect("/");
		(response as any).body = true;
		return response;
	}
	return new URL(request.url).searchParams.get("message");
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formdata = await request.formData();
	const email = formdata.get("email");
	const password = formdata.get("password");

	const pathName = new URL(request.url).searchParams.get("redirectTo") || "/";
	try {
		const data = await loginUser({ email, password } as UserLoginRequest);
		localStorage.setItem("loggedIn", "true");
		const response = redirect(pathName);
		(response as any).body = true;
		return response;
	} catch (e) {
		return (e as Error).message;
	}
};

const Login = () => {
	// const [searchParams,setSearchParams] =useSearchParams();
	// console.log(searchParams.get("message"))
	const message = useLoaderData() as string | null;
	const errorMessage = useActionData() as string | null;
	const { state /*the navigation state */ } = useNavigation(); //note: not useNavigate
	return (
		<div className="login-container">
			<h1>Sign in to your account</h1>
			{message && <h3 className="red">{message}</h3>}
			{errorMessage && <h3 className="red">{errorMessage}</h3>}
			<Form className="login-form" replace method="POST">
				<input name="email" type="email" placeholder="Email address" />
				<input name="password" type="password" placeholder="Password" />
				<button type="submit" disabled={state === "submitting"}>
					{state === "submitting" ? "Logging in" : "Log in"}
				</button>
			</Form>
		</div>
	);
};

export default Login;

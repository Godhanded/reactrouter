import React, { ChangeEvent, FormEvent, useState } from "react";
import "../Styles/Login.css";
import {
	LoaderFunctionArgs,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import { User, UserLoginRequest } from "../types";
import { loginUser } from "../Api";

export const loader = ({ request }: LoaderFunctionArgs) => {
	return new URL(request.url).searchParams.get("message");
};

const LoginManualForms = () => {
	const [loginFormData, setLoginFormData] = useState<UserLoginRequest>({
		email: "",
		password: "",
	});
	const [status, setStatus] = useState<string>("idle");
	const [error, setError] = useState<Error | null>(null);
	const navigate = useNavigate();

	// const [searchParams,setSearchParams] =useSearchParams();
	// console.log(searchParams.get("message"))

	const message = useLoaderData() as string | null;

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setStatus("submitting");
		setError(null);
		loginUser(loginFormData)
			.then((data) => navigate("/host", { replace: true }))
			.catch((e) => setError(e))
			.finally(() => setStatus("idle"));
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setLoginFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	return (
		<div className="login-container">
			<h1>Sign in to your account</h1>
			{message && <h3 className="red">{message}</h3>}
			{error && <h4 className="red">{error.message}</h4>}
			<form onSubmit={handleSubmit} className="login-form">
				<input
					name="email"
					onChange={handleChange}
					type="email"
					placeholder="Email address"
					value={loginFormData.email}
				/>
				<input
					name="password"
					onChange={handleChange}
					type="password"
					placeholder="Password"
					value={loginFormData.password}
				/>
				<button disabled={status === "submitting" ? true : false}>
					{status === "submitting" ? "Logging in ..." : "Log in"}
				</button>
			</form>
		</div>
	);
};

export default LoginManualForms;

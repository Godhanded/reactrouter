import { redirect } from "react-router-dom";

export const requiresAuth = (request: Request): Response | null => {
	const path = new URL(request.url).pathname;
	const loggedIn = localStorage.getItem("loggedIn");
	if (!loggedIn) {
		const response = redirect(
			`/login?redirectTo=${path}&message=you must login first`,
		);
		/*With an update made to v 6.4.5 of React Router, Mirage JS is causing some errors when using the redirect 
          function from React Router. tl;dr: a library that Mirage JS is using under the hood (pretender) uses a polyfill 
          for fetch, and that polyfill does not adhere to the fetch specifications, in that it does not return a 
          response with a body property. In React Router 6.4.5, they included a new check to make sure that a response 
          has a body property, which makes any redirect call in React Router fail.*/
		/*This cast allows you to bypass the TypeScript restriction on modifying the readonly body property.
          While this is not ideal, it’s a safe workaround since React Router itself doesn’t rely on the body for redirects—it just needs the property to exist.*/
		(response as any).body = true;
		return response;
	}
	return null;
};

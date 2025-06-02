import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import {client} from "@/lib/rpc"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>;

export const useRegister = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({json}) => {
            const response = await client.api.auth.register["$post"]({json});

            if (!response.ok) {
                throw new Error("Failed to register user");
            }

            return await response.json()
        },
        onSuccess:() => {
            toast.success("Registration successful");
            router.refresh()
            queryClient.invalidateQueries({ queryKey: ["current"]})
        },
        onError: (error) => {
            toast.error(`Registration failed: ${error.message}`);
        }
    });
    return mutation;
};
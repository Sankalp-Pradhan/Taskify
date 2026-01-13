import { toast } from "sonner";
import { Mutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


type ResponseType = InferResponseType<typeof client.api.tasks["$post"], 200>
type RequestType = InferRequestType<typeof client.api.tasks["$post"]>

export const useCreateTask = () => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json }) => {
            const response = await client.api.tasks["$post"]({ json });//     ({json})

            if (!response.ok) {
                throw new Error("Failed to create tasks");
            }

            return await response.json();
        },

        onSuccess: ({ data }) => {
            toast.success("Task created");
            router.push(`/workspaces/${data.workspaceId}/projects/${data.$id}`);
            queryClient.invalidateQueries({ queryKey: ["tasks"] })
        },
        onError: () => {
            toast.error("Failed to create task");
        }
    });


    return mutation;
}

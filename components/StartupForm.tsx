"use client"

import {Input} from "@/components/ui/input";
import {useActionState, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {formSchema} from "@/lib/validation";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {z} from "zod";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const router = useRouter();

    const handleSubmit = async (prevState: any, formdata: FormData) => {
        try {
            const formValues = {
                title: formdata.get("title") as string,
                description: formdata.get("description") as string,
               category: formdata.get("category") as string,
                link: formdata.get("link") as string,
                pitch,
            };

            await formSchema.parseAsync(formValues);

            console.log(formValues);

            // const result = await createPitch(prevState, formdata, pitch);
            //
            // if(result.status === "SUCCESS") {
            //     toast.success("Your startup pitch has been created successfully");
            //     router.push(`/startup/${result.id}`);
            // }
            // return result;
        } catch (error) {
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;

                setErrors(fieldErrors as unknown as Record<string, string>);
                toast.error("Please check your inputs and try again");

                return {
                    ...prevState,
                    error: "Validation Failed",
                    status: "ERROR"
                }
            }

            toast.error("An unexpected error has occurred");
            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR"
            }
        }
    }

    const [state, formAction, isPending] = useActionState(handleSubmit, {
        error: "",
        status: "INITIAL"
    });


    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">Title</label>
                <Input
                    id="title"
                    name="title"
                    className="startup-form_input"
                    placeholder="Title of your startup"
                    required
                />

                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>
            <div>
                <label htmlFor="description" className="startup-form_label">Description</label>
                <Textarea
                    id="description"
                    name="description"
                    className="startup-form_textarea"
                    placeholder="Describe your startup"
                    required
                />

                {errors.description && <p className="startup-form_error">{errors.description}</p>}
            </div>
            <div>
                <label htmlFor="category" className="startup-form_label">Category</label>
                <Input
                    id="category"
                    name="category"
                    className="startup-form_input"
                    placeholder="Startup Category (Tech, Health, Education...)"
                    required
                />

                {errors.category && <p className="startup-form_error">{errors.category}</p>}
            </div>
            <div>
                <label htmlFor="link" className="startup-form_label">Image URL</label>
                <Input
                    id="link"
                    name="link"
                    className="startup-form_input"
                    placeholder="Startup Image URL"
                    required
                />

                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>
            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">PItch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => {setPitch(value as string)}}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    textareaProps={{
                        placeholder: "Briefly describe your idea and what problem it solves",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"]
                    }}
                />

                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>

            <Button
                type="submit"
                className="startup-form_btn text-white cursor-pointer"
                disabled={isPending}
            >
                { isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send />
            </Button>
        </form>
    )
}
export default StartupForm

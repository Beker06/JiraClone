"use client"

import Link from 'next/link'
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
    Card, 
    CardHeader, 
    CardTitle,
    CardContent,
    CardDescription
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import DottedSeparator from '@/components/dotted-separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { registerSchema } from '../schema'
import { useRegister } from '../api/use-register'

const SignUpCard = () => {
    const { mutate, isPending } = useRegister();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        mutate({
            json: values
        })
    }

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className='flex items-center justify-center text-center p-7'>
                <CardTitle className='text-2xl'>
                    Sign Up
                </CardTitle>
                <CardDescription>
                    By signing up, you agree to our{" "}
                    <Link href="/privacy">
                        <span className='text-blue-700'>Privacy Policy</span>
                    </Link>{" "}
                    and {" "}
                    <Link href="/terms">
                        <span className='text-blue-700'>Terms of Service</span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <div className='px-7'>
                <DottedSeparator/>
            </div>
            <CardContent className='p-7'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            name="name"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="text"
                                            placeholder='Enter your name'
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="email"
                                            placeholder='Enter email address'
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="password"
                                            placeholder='Enter password'
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={isPending}
                            size="lg"
                            className='w-full'
                        >
                            Sign Up
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className='px-7'>
                <DottedSeparator/>
            </div>
            <CardContent className='p-7 flex flex-col gap-y-5'>
                <Button
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className='w-full'
                >
                    <FcGoogle className="mr-2 size-5"/>
                    Sign up with Google
                </Button>
                <Button
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className='w-full'
                >
                    <FaGithub className='mr-2 size-5'/>
                    Sign up with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator/>
            </div>
            <CardContent className="p-7 flex - items-center justify-center">
                <p>
                    Already have an account?{" "}
                    <Link href="/sign-in">
                    <span className="text-blue-700">Sign In</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}

export default SignUpCard
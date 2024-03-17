import { useForm } from '@tanstack/react-form'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import { customAsync, minLength, string, stringAsync } from 'valibot'
import type { FieldApi } from '@tanstack/react-form'
import { Input } from './ui/input'
import { Button } from './ui/button'

const UserForm = () => {
    const form = useForm({
        defaultValues: {
            userName: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            console.log(value)
        },
        // Add a validator to support Valibot usage in Form and Field
        validatorAdapter: valibotValidator,
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                void form.handleSubmit()
            }}
        >
            <div>
                {/* A type-safe field component*/}
                <form.Field
                    name="userName"
                    validators={{
                        onChange: string([
                            minLength(3, 'First name must be at least 3 characters'),
                        ]),
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: stringAsync([
                            customAsync(async (value) => {
                                await new Promise((resolve) => setTimeout(resolve, 1000))
                                return !value.includes('error')
                            }, "No 'error' allowed in first name"),
                        ]),
                    }}
                    children={(field) => {
                        // Avoid hasty abstractions. Render props are great!
                        return (
                            <>
                                <label htmlFor={field.name}>First Name:</label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                <FieldInfo field={field} />
                            </>
                        )
                    }}
                />
            </div>
            <div>
                <form.Field
                    name="password"
                    children={(field) => (
                        <>
                            <label htmlFor={field.name}>Last Name:</label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                type="password"
                            />
                            <FieldInfo field={field} />
                        </>
                    )}
                />
            </div>
            <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                    <Button type="submit" disabled={!canSubmit}>
                        {isSubmitting ? '...' : 'Submit'}
                    </Button>
                )}
            />
        </form>
    )
}

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.touchedErrors ? <em>{field.state.meta.touchedErrors}</em> : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}

export default UserForm

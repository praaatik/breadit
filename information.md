## Extending the default component
- It is possible to extend the default React functional component with an HTML element so we could pass in the props classnames and all the other properties which are passed in to the div.

- consider the UserAuthForm which is doing so,

```tsx
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
        return <></>
}
```

Here, since the `UserAuthFormProps` is extending the `React.HTMLAttributes<HTMLDivElement>`, we can pass in properties specific to `div` like `className`, `aria-label`, etc.



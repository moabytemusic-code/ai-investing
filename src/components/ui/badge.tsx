import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full border border-transparent px-4 py-1.5 text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80 shadow-lg shadow-primary/20",
        secondary: "bg-white/5 border-white/10 text-white hover:bg-white/10",
        destructive: "bg-red-500/10 text-red-500 border-red-500/20",
        outline: "border-white/20 text-white hover:bg-white/5",
        ghost: "hover:bg-white/5 text-gray-400 hover:text-white",
        emerald: "bg-emerald/10 text-emerald border border-emerald/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }

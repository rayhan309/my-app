import { JSX } from "react";

export default function OverlayPattern(): JSX.Element {
    return (
        <>
            <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_800px_at_100%_200px,var(--color-primary-10),transparent)]" />
        </>
    );
}
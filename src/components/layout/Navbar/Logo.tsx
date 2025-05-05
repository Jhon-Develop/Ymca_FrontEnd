import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <Image
                src="/images/Ymca_blue.svg"
                alt="YMCA Logo"
                width={120}
                height={48}
                className="block dark:hidden"
            />
            <Image
                src="/images/Ymca_white.svg"
                alt="YMCA Logo"
                width={120}
                height={48}
                className="hidden dark:block"
            />
        </Link>
    )
}

export default Logo
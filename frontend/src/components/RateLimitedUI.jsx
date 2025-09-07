import { ZapIcon } from "lucide-react"

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
        <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center p-6">
                <div className="flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                    <ZapIcon className="size-10 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-xl font-bold mb-2">Rate Limit Reached</h2>
                    <p className="text-base-content mb-1">You have reached the maximum number of requests. Please try again later.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RateLimitedUI
import { Link } from 'react-router'
import notFound from '../../src/assets/NotFound.svg'

const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-[#111] px-4">
    <div className="max-w-md text-center">
      <div className="w-full">
        <img src={notFound} alt="Not Found" />
      </div>
      <h4 className="mt-9 mb-9 text-2xl leading-snug font-medium text-white">
        Sorry, we didn't find any match!
      </h4>
      <Link to="/" className="rounded-md bg-yellow-500 px-6 py-2 text-white transition hover:bg-yellow-600">
        Back to Home
      </Link>
    </div>
  </div>
)

export default NotFoundPage
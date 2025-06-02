import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuthContext } from '@/contexts/Auth'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../axios.js'
import config from '../config.json'

const AppAccount: React.FC<IAccountProps> = ({
  id,
  username,
  email,
  googleId,
  githubId,
  verified,
  saves,
}) => {
  const { setAuth } = useAuthContext()

  const unattachGoogleId = () => {
    try {
      axios
        .post('/api/google/unattach')
        .then(res => setAuth(res.data.answer))
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }

  const unattachGithubId = () => {
    try {
      axios
        .post('/api/github/unattach')
        .then(res => setAuth(res.data.answer))
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col gap-[20px] w-[min(1000px,_100%)]">
      <Card className="gap-[10px] w-full">
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
          <CardDescription>The description of your personality</CardDescription>
        </CardHeader>
        <CardContent className="gap-[10px]">
          <ul>
            <li>
              Username: <strong>{username || 'guest'}</strong>
            </li>
            <li>
              <span>
                Email: <strong>{email || 'unknown'}</strong>
              </span>{' '}
              {!verified ? (
                <span className="text-red-500">(not verified)</span>
              ) : (
                <span className="text-green-500">(verified)</span>
              )}
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="gap-[10px] w-full">
        <CardHeader>
          <CardTitle>Socials</CardTitle>
          <CardDescription>
            The great variety of you in different ways
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-[10px]">
          <ul>
            <li className="flex items-center gap-[10px]">
              <FontAwesomeIcon icon={faGoogle} />
              <div className="flex items-center gap-[5px]">
                <a
                  className="text-muted-foreground hover:underline"
                  href={
                    id
                      ? `${config.SERVER_URL}/api/google/login?id=${id}`
                      : '/login'
                  }
                >
                  {googleId ? (
                    <span>
                      Google-ID: <strong>{googleId}</strong>
                    </span>
                  ) : (
                    <span>Attach Google-ID</span>
                  )}
                </a>
                {googleId && (
                  <button onClick={unattachGoogleId}>
                    <Plus className="rotate-[45deg]" />
                  </button>
                )}
              </div>
            </li>
            <li className="flex items-center gap-[10px]">
              <FontAwesomeIcon icon={faGithub} />
              <div className="flex items-center gap-[5px]">
                <a
                  className="text-muted-foreground hover:underline"
                  href={
                    id
                      ? `${config.SERVER_URL}/api/github/login?id=${id}`
                      : '/login'
                  }
                >
                  {githubId ? (
                    <span>
                      Github-ID: <strong>{githubId}</strong>
                    </span>
                  ) : (
                    <span>Attach Github-ID</span>
                  )}
                </a>
                {githubId && (
                  <button onClick={unattachGithubId}>
                    <Plus className="rotate-[45deg]" />
                  </button>
                )}
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="gap-[10px] w-full">
        <CardHeader>
          <CardTitle>Saves</CardTitle>
          <CardDescription>The list of your SNKRS besties</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-[repeat(3,_1fr)] gap-[10px]">
          {!saves?.length ? (
            <span>Loading...</span>
          ) : (
            saves.map((save, i) => {
              return (
                <Link
                  key={i}
                  to={`/products/${save.Id}`}
                  className="overflow-hidden"
                >
                  <img
                    src={save.Image}
                    alt="SaveCover"
                    className="object-cover w-full rounded-xl"
                  />
                </Link>
              )
            })
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AppAccount

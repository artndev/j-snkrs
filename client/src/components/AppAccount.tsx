import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import config from '../config.json'
import { useAuthContext } from '@/contexts/Auth'
import axios from '../axios.js'

const AppAccount: React.FC<IAccountProps> = ({
  id,
  username,
  email,
  googleId,
  githubId,
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
      <Card className="gap-[10px] w-full h-[max-content]">
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
              Email: <strong>{email || 'unknown'}</strong>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="gap-[10px] w-full h-[max-content]">
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
    </div>
  )
}

export default AppAccount

import { Paper, Typography } from '@mui/material'
import { Stack } from '@mui/system'

import CustomButton from './CustomButton'
import { useSelector } from 'react-redux'

const CustomCard = ({ game }) => {
    const user = useSelector(state => state.user)
    return (
        <Paper sx={{ p: 2, my: 1 }}>
            {game.owner == user.email && <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Game with {game.rivalName}</Typography>}
            {game.rival == user.email && <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>Game with {game.ownerName}</Typography>}

            {(game.status == "rivals move" && user.email == game.rival) && <Stack sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 300 }}>{game.ownerName} just made their move!</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 300, width: 170 }}>It's your turn to play now.</Typography>
            </Stack>}

            {(game.status == "rivals move" && user.email == game.owner) && <Stack sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 300 }}>You have made your move!</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 300, width: 170 }}>Wait for your turn.</Typography>
            </Stack>}

            {(game.status == "owners move" && user.email == game.owner) && <Stack sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 300 }}>{game.rivalName} just made their move!</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 300, width: 170 }}>It's your turn to play now.</Typography>
            </Stack>}

            {(game.status == "owners move" && user.email == game.rival) && <Stack sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 300 }}>You have made your move!</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 300, width: 170 }}>Wait for your turn.</Typography>
            </Stack>}

            {(game.status == "draw") && <Stack sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 300 }}>It's a Draw!</Typography>
            </Stack>}

            {(game.status == "rival wins" && user.email == game.rival) && <Stack sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 300 }}>You won!</Typography>
            </Stack>}

            {(game.status == "rival wins" && user.email == game.owner) && <Stack sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 300 }}>You lost!</Typography>
            </Stack>}

            {(game.status == "owner wins" && user.email == game.owner) && <Stack sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 300 }}>You won!</Typography>
            </Stack>}

            {(game.status == "owner wins" && user.email == game.rival) && <Stack sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 300 }}>You lost!</Typography>
            </Stack>}

            <Stack sx={{ mt: 1.5, mb: 1.5 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 300, width: 170 }}>{Date(game.updatedAt).slice(0, 25)}</Typography>
            </Stack>

            {((game.status == "rivals move" && user.email == game.rival) ||
                (game.status == 'owners move' && user.email == game.owner)) &&
                <CustomButton path={`/play/${game._id}`}>Make your move!</CustomButton>}


            {((game.status == "owners move" && user.email == game.rival) ||
                (game.status == "rivals move" && user.email == game.owner)) &&
                <CustomButton path={`/play/${game._id}`}>Wait for your turn!</CustomButton>}

            {(game.status == 'rival wins' || game.status == 'owner wins' || game.status == 'draw') &&
                <CustomButton path={`/play/${game._id}`}>View Game</CustomButton>}
        </Paper>
    )
}

export default CustomCard
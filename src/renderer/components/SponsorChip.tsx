import React, { useState, useEffect } from 'react'
import { Chip } from '@mui/material'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { SponsorAd } from '../../shared/types'
import * as remote from '../packages/remote'
import platform from '../packages/platform'

export interface Props {
    sessionId: string
}

export default function SponsorChip(props: Props) {
    const [showSponsorAD, setShowSponsorAD] = useState(true)
    const [sponsorAD, setSponsorAD] = useState<SponsorAd | null>(null)
    useEffect(() => {
        ;(async () => {
            const ad = await remote.getSponsorAd()
            if (ad) {
                setSponsorAD(ad)
            }
        })()
    }, [props.sessionId])
    if (!showSponsorAD || !sponsorAD) {
        return <></>
    }
    return (
        <Chip
            size="small"
            sx={{
                maxWidth: '400px',
                height: 'auto',
                '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal',
                },
                borderRadius: '8px',
                marginRight: '25px',
                opacity: 0.6,
            }}
            icon={<CampaignOutlinedIcon />}
            deleteIcon={<CancelOutlinedIcon />}
            onDelete={() => setShowSponsorAD(false)}
            onClick={() => platform.openLink(sponsorAD.url)}
            label={sponsorAD.text}
        />
    )
}

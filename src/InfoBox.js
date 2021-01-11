import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css'


function InfoBox({ title, cases, total }) {
    return (
        <Card className="infoBox">
            <CardContent className="infoBox-title">
                {/* Title */}
                <Typography color="textSecondary">{title}</Typography>
                {/* +120k number of cases */}
                <h2 className="infoBox-cases">{cases}</h2>
                {/* 1.2M total */}
                <Typography className="infoBox-total">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox

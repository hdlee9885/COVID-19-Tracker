import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css'


function InfoBox({ title, cases, total, isRed, isGreen, isDeath, active, ...props }) {
    return (
        <Card
            onClick={ props.onClick } 
            className={`infoBox ${active && "infoBox--selected"} 
                        ${isRed && "infoBox--isBorderRed"}
                        ${isGreen && "infoBox--isBorderGreen"}
                        ${isDeath && "infoBox--isBorderGrey"}`}
        >
            <CardContent className="infoBox-title">
                {/* Title */}
                <Typography gutterBottom>{title}</Typography>
                {/* +120k number of cases */}
                <h2 className={`infoBox-cases 
                                ${isRed && "infoBox--isRed"} 
                                ${isGreen && "infoBox--isGreen"}
                                ${isDeath && "infoBox--isGrey"}`}>{cases}</h2>
                {/* 1.2M total */}
                <Typography className="infoBox-total">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox

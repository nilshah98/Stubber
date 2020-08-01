import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const ButtonExampleEmphasis = () => (
    <div>
        <Button primary icon="cut" size="massive">
            <Icon name="cut" />
            Start harvesting
        </Button>
        <Button secondary size="massive">
            <Icon name="history" />
            Show History
        </Button>
    </div>
);

const FDashboard = () => {
    return (
        <div>
            Farmer dashboard
            <ButtonExampleEmphasis />
        </div>
    )
}

export default FDashboard
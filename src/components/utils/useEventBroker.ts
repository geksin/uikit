import React from 'react';
import {eventBroker, EventBrokerSubscription} from './event-broker';

export function useEventBroker(subscription: EventBrokerSubscription, broker = eventBroker) {
    React.useEffect(() => {
        broker.subscribe(subscription);
        return () => broker.unsubscribe(subscription);
    }, [broker, subscription]);
}

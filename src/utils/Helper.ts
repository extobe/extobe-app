/* eslint-disable prettier/prettier */
import { showMessage } from 'react-native-flash-message';

import { MessageStyle } from '../styles/fonts';

export const showMess = (message: string, type = 'error') => {
    if (type === 'success') {
        return showMessage({
            message,
            ...MessageStyle.success,
        });
    }
    if (type === 'info') {
        return showMessage({
            message,
            ...MessageStyle.success,
        });
    }
    return showMessage({
        message,
        ...MessageStyle.error,
    });
};
// export const secondsToStringTime = (seconds: number) => {
//     return new Date(seconds * 3000).toISOString().substr(11, 8).split(':');
// };

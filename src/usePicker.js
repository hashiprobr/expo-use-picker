import { useState } from 'react';

import * as DocumentPicker from 'expo-document-picker';

export default function usePicker() {
    const [loading, setLoading] = useState(false);

    async function load(type) {
        let uri;
        setLoading(true);
        const options = {};
        if (type) {
            options.type = type;
        }
        try {
            const result = await DocumentPicker.getDocumentAsync(options);
            if (result.type !== 'cancel') {
                uri = result.uri;
            }
        } finally {
            setLoading(false);
        }
        return uri;
    }

    return {
        loading,
        load,
    };
}

import 'react-native-get-random-values';

import { nanoid } from 'nanoid';

import { useState } from 'react';

import { Platform } from 'react-native';

import * as FileSystem from 'expo-file-system';
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
        if (Platform.OS === 'android') {
            options.copyToCacheDirectory = false;
        }
        try {
            const result = await DocumentPicker.getDocumentAsync(options);
            if (result.type !== 'cancel') {
                if (Platform.OS === 'android') {
                    uri = `${FileSystem.cacheDirectory}${nanoid()}`;
                    await FileSystem.copyAsync({ from: result.uri, to: uri });
                } else {
                    uri = result.uri;
                }
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

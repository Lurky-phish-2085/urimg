<?php

use App\Models\MergedRetrievalId;

const ALPHANUMERIC_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz' .
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' .
    '0123456789';

const RETIREVAL_ID_LENGTH = 8;


if (!function_exists('generateRetrievalID')) {

    function generateRetrievalID(): string
    {
        $generateRandomAlphaNum = function (): string {
            mt_srand(time());

            $alphaNum = '';
            foreach (range(1, RETIREVAL_ID_LENGTH) as $i) {
                $alphaNumCharsLength = strlen(ALPHANUMERIC_CHARACTERS);
                $randomIndex = mt_rand(0, $alphaNumCharsLength - 1);

                $alphaNum .= ALPHANUMERIC_CHARACTERS[$randomIndex];
            }

            return $alphaNum;
        };
        $retrievalIDExists = function (string $retrievalID): bool {
            return MergedRetrievalId::where('retrieval_id', $retrievalID)->exists();
        };

        $generatedID = $generateRandomAlphaNum();
        while ($retrievalIDExists($generatedID)) {
            $generatedID = $generateRandomAlphaNum();
        }

        return $generatedID;
    }
}

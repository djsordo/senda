#
# prueba a user cloud firestore con curl
#



endpoint="https://firestore.googleapis.com"
client_id=$(node get_credentials.js client_id)
client_secret=$(node get_credentials.js client_secret)
authorization_server=$(node get_credentials.js auth_uri)
project="projects/sendaestadisticas-com-desa"
database="databases/(default)"
collection="documents/clubs"

#curl --request GET "$endpoint/v1/$project/databases" \
#-H "Authorization: Bearer ya29.a0AbVbY6Nu5Q6Uz-O18Eh1BspSJ1FrYKuZFNGYD1o02d5Mo3HOBU0k6joOJ_XLtlbYSTn33FqkOCdvsQQ0GzxsJckZCxJVM6VUs3m3CYsIpaAm2ZZO1Qn_dCQg5gkBGVk1hF60NaS1D9EbOQ9BPrSA2LkT4PlNnTpD8F02aCgYKASUSARASFQFWKvPl4y2EljYSFjWuHxumw1xC-A0171"

#curl --request GET "$endpoint/v1/$project/$database/documents/clubs/ruyHqsedtncUxZOFNAZB" \
#-H "Authorization: Bearer ya29.a0AbVbY6Nu5Q6Uz-O18Eh1BspSJ1FrYKuZFNGYD1o02d5Mo3HOBU0k6joOJ_XLtlbYSTn33FqkOCdvsQQ0GzxsJckZCxJVM6VUs3m3CYsIpaAm2ZZO1Qn_dCQg5gkBGVk1hF60NaS1D9EbOQ9BPrSA2LkT4PlNnTpD8F02aCgYKASUSARASFQFWKvPl4y2EljYSFjWuHxumw1xC-A0171"

# OK: se trae todas las bases de datos
curl --request GET "$endpoint/v1/$project/$database/$collection" \
-H "Authorization: Bearer ya29.a0AbVbY6Nu5Q6Uz-O18Eh1BspSJ1FrYKuZFNGYD1o02d5Mo3HOBU0k6joOJ_XLtlbYSTn33FqkOCdvsQQ0GzxsJckZCxJVM6VUs3m3CYsIpaAm2ZZO1Qn_dCQg5gkBGVk1hF60NaS1D9EbOQ9BPrSA2LkT4PlNnTpD8F02aCgYKASUSARASFQFWKvPl4y2EljYSFjWuHxumw1xC-A0171"

# OK: crea un club nuevo llamado "club-de-codornillos"
# curl --request POST "$endpoint/v1/$project/$database/$collection?documentId=club-de-codornillos" \
# --header "Authorization: Bearer ya29.a0AbVbY6Nu5Q6Uz-O18Eh1BspSJ1FrYKuZFNGYD1o02d5Mo3HOBU0k6joOJ_XLtlbYSTn33FqkOCdvsQQ0GzxsJckZCxJVM6VUs3m3CYsIpaAm2ZZO1Qn_dCQg5gkBGVk1hF60NaS1D9EbOQ9BPrSA2LkT4PlNnTpD8F02aCgYKASUSARASFQFWKvPl4y2EljYSFjWuHxumw1xC-A0171" \
# --header "Content-Type: application/json" \
# --data '{"fields":{ "uno" : { "integerValue": 1 }, "dos": { "stringValue" : "2"} }}'

# ??: modifica el club creado anteriormente añadiendo un campo nuevo
#curl --request PATCH "$endpoint/v1/$project/$database/$collection" \
#--header "Authorization: Bearer ya29.a0AbVbY6Nu5Q6Uz-O18Eh1BspSJ1FrYKuZFNGYD1o02d5Mo3HOBU0k6joOJ_XLtlbYSTn33FqkOCdvsQQ0GzxsJckZCxJVM6VUs3m3CYsIpaAm2ZZO1Qn_dCQg5gkBGVk1hF60NaS1D9EbOQ9BPrSA2LkT4PlNnTpD8F02aCgYKASUSARASFQFWKvPl4y2EljYSFjWuHxumw1xC-A0171" \
#--header "Content-Type: application/json" \
#--data '{"name": "club-de-codornillos", "fields":{ "tres" : { "stringValue" : "yo-soy-el-nuevo, respetadme" } }}'

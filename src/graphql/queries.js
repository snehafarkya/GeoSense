import { gql } from "@apollo/client"

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
      capital
      currency
      languages {
        name
      }
      continent {
        name
      }
    }
  }
`

export const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      emoji
      capital
      currency
      phone
      languages {
        name
      }
      continent {
        name
      }
    }
  }
`

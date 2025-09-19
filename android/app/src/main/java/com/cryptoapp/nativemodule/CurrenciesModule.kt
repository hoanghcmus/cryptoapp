package com.cryptoapp

import com.facebook.react.bridge.*

class CurrenciesModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "CurrenciesModule"

  @ReactMethod
  fun fetchAllCurrencies(promise: Promise) {
    try {
      val cryptoCurrencies = listOf(
        mapOf("id" to "BTC", "name" to "Bitcoin", "symbol" to "BTC"),
        mapOf("id" to "ETH", "name" to "Ethereum", "symbol" to "ETH"),
        mapOf("id" to "XRP", "name" to "XRP", "symbol" to "XRP"),
        mapOf("id" to "BCH", "name" to "Bitcoin Cash", "symbol" to "BCH"),
        mapOf("id" to "LTC", "name" to "Litecoin", "symbol" to "LTC"),
        mapOf("id" to "EOS", "name" to "EOS", "symbol" to "EOS"),
        mapOf("id" to "BNB", "name" to "Binance Coin", "symbol" to "BNB"),
        mapOf("id" to "LINK", "name" to "Chainlink", "symbol" to "LINK"),
        mapOf("id" to "NEO", "name" to "NEO", "symbol" to "NEO"),
        mapOf("id" to "ETC", "name" to "Ethereum Classic", "symbol" to "ETC"),
        mapOf("id" to "ONT", "name" to "Ontology", "symbol" to "ONT"),
        mapOf("id" to "CRO", "name" to "Crypto.com Chain", "symbol" to "CRO"),
        mapOf("id" to "CUC", "name" to "Cucumber", "symbol" to "CUC"),
        mapOf("id" to "USDC", "name" to "USD Coin", "symbol" to "USDC")
      )

      val fiatCurrencies = listOf(
        mapOf("id" to "SGD", "name" to "Singapore Dollar", "symbol" to "$", "code" to "SGD"),
        mapOf("id" to "EUR", "name" to "Euro", "symbol" to "€", "code" to "EUR"),
        mapOf("id" to "GBP", "name" to "British Pound", "symbol" to "£", "code" to "GBP"),
        mapOf("id" to "HKD", "name" to "Hong Kong Dollar", "symbol" to "$", "code" to "HKD"),
        mapOf("id" to "JPY", "name" to "Japanese Yen", "symbol" to "¥", "code" to "JPY"),
        mapOf("id" to "AUD", "name" to "Australian Dollar", "symbol" to "$", "code" to "AUD"),
        mapOf("id" to "USD", "name" to "United States Dollar", "symbol" to "$", "code" to "USD")
      )

      val result: WritableArray = Arguments.createArray()

      // Convert crypto list
      for (c in cryptoCurrencies) {
        val map = Arguments.createMap()
        map.putString("id", c["id"])
        map.putString("name", c["name"])
        map.putString("symbol", c["symbol"])
        result.pushMap(map)
      }

      // Convert fiat list
      for (c in fiatCurrencies) {
        val map = Arguments.createMap()
        map.putString("id", c["id"])
        map.putString("name", c["name"])
        map.putString("symbol", c["symbol"])
        map.putString("code", c["code"])
        result.pushMap(map)
      }

      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("ERR_FETCH", e)
    }
  }
}

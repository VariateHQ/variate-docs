# Targeting

Variate must to be reinitalize between each page / view change to target experiments correctly. This can be done in the provider by calling active in the onViewChange or by calling initialize on the variate config object.

## With onViewChange

```jsx

<VariateProvider
  onViewChange={activate => { 
    activate({ view: window.location.pathname });
  }
}>
  ...
</VariateProvider>

```

## Without onViewChange

```jsx

const App = () => {
  <VariateProvider>
    (({ variate }) => {
      variate.initialize({ view: window.location.pathname })
      return (
        ...
      )
    })
  </VariateProvider>
}

```
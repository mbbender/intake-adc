# Intake ADC
## Convert UART data into 16 bit unsigned ints
### Installation
Install (NodeJS) [https://nodejs.org].

For mac users using homebrew
```
$ brew install node
```

Verify installation
```
$ node -v
$ npm -v
```

Install this package
```
$ npm install -g intake-adc
```

### Running
To run the tool after global installation you just need to run the utility from the command line and following the prompots. By default it expects to see the input file in a `data/session.log` file from the directory in which you are running the command. However you can input a path to any file.
```
$ intake-adc
```

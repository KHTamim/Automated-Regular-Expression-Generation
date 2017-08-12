The regexGen() function generates a regex from a single word sample. By using single sample, the 
generated regex will not match words that are identical to the sample but will match 
words having the exact same properties like the sample's properties.

To achieve this, a iterative-divide-and-conquer approach has followed. First the 
generator will replace equivalent regex for every character in the sample. then 
that "raw regex" will be analyzed many times to generate equivalent optimized regex.

In this release, the regexGen() with analyze the rawRgx one time to add quantifier.
for example- '\w\w\w\,\w\w\w\ \d\d\d' will wii be '\w+\,\w+\ \d+'
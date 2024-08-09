import sys
from gpt4all import GPT4All

def main():
    question = sys.argv[1]
    # question = "What is 1+1"
    
    model_name = "orca-mini-3b-gguf2-q4_0.gguf"
    gpt = GPT4All(model_name)
    
    with gpt.chat_session():
        answer = gpt.generate(f"{question}", max_tokens=16400)
        print(answer, flush=True)

if __name__ == "__main__":
    main()

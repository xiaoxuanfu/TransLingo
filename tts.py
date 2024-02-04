import os
import sys
sys.path.insert(0, '/home/voan/techfest/OpenVoice')
import se_extractor
from api import BaseSpeakerTTS, ToneColorConverter
sys.path.remove('/home/voan/techfest/OpenVoice')
import argparse
import torch


def main():
    parser = argparse.ArgumentParser(description='Perform text-to-speech generation using OpenVoice')
    parser.add_argument('--text', type=str, default='What you hear is the default speech output.')
    parser.add_argument('--ref-path', type=str, default='resources/example_reference.mp3')
    args = parser.parse_args()

    ckpt_base = 'OpenVoice/checkpoints/base_speakers/EN'
    ckpt_converter = 'OpenVoice/checkpoints/converter'
    device="cuda:0" if torch.cuda.is_available() else "cpu"
    output_dir = 'outputs'

    base_speaker_tts = BaseSpeakerTTS(f'{ckpt_base}/config.json', device=device)
    base_speaker_tts.load_ckpt(f'{ckpt_base}/checkpoint.pth')

    tone_color_converter = ToneColorConverter(f'{ckpt_converter}/config.json', device=device)
    tone_color_converter.load_ckpt(f'{ckpt_converter}/checkpoint.pth')

    os.makedirs(output_dir, exist_ok=True)
    source_se = torch.load(f'{ckpt_base}/en_default_se.pth').to(device)

    reference_speaker = args.ref_path
    target_se, audio_name = se_extractor.get_se(reference_speaker, tone_color_converter, target_dir='processed', vad=True)

    save_path = f'{output_dir}/output_en_default.wav'

    # Run the base speaker tts
    src_path = f'{output_dir}/tmp.wav'
    base_speaker_tts.tts(args.text, src_path, speaker='default', language='English', speed=1.0)

    # Run the tone color converter
    encode_message = "@MyShell"
    tone_color_converter.convert(
        audio_src_path=src_path, 
        src_se=source_se, 
        tgt_se=target_se, 
        output_path=save_path,
        message=encode_message)

if __name__ == '__main__':
    main()